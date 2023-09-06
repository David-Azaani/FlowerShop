using FlowerShop.Api.Data;
using FlowerShop.Api.DTOs;
using FlowerShop.Api.Entities;
using FlowerShop.Api.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.Api.Controllers;

public class BasketController : BaseApiController
{

    private readonly DataContext _dataContext;

    public BasketController(ILogger<BasketController> logger, DataContext dataContext) : base(logger)
    {
        _dataContext = dataContext;

    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetriveBasket();
        if (basket == null) return NotFound();

        return MapBasketToDto(basket);
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {

        var basket = await RetriveBasket();  //Get Basket

        if (basket == null) basket = await CreateBasket(); //Create Basket

        var product = await _dataContext.Products.FindAsync(productId); //Get product

        if (product == null) return NotFound();

        basket.AddItem(product, quantity); //add item

        var result = await _dataContext.SaveChangesAsync() > 0;  //Save

        if (result) return CreatedAtRoute(nameof(GetBasket), MapBasketToDto(basket));

        return BadRequest(new ProblemDetails { Title = "Problem Saving item to Basket" });
    }



    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        var basket = await RetriveBasket(); //Get Basket
        if (basket == null) return NotFound();
        basket.RemoveItem(productId, quantity);//remove item or reduce quantity
        var result = await _dataContext.SaveChangesAsync() > 0;//save change
        if (result) return Ok();
        return BadRequest(new ProblemDetails { Title = "Problem Removing item to Basket" });

    }
    private async Task<Basket> RetriveBasket()
    {
        return await _dataContext.Baskets
            .Include(x => x.items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == (Request.Cookies[SD.CookieName]));
    }
    private async Task<Basket> CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        // HttpOnly : we dont adjust this otherwise we can use ajax and typescript
        // IsEssetntial Must be true
        var coockieOption = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
        Response.Cookies.Append(SD.CookieName, buyerId, coockieOption);

        var basket = new Basket { BuyerId = buyerId };
        await _dataContext.AddAsync(basket);
        // dont save the basket,Just add to entity and it'll be tracking this
        return basket;

    }

    private BasketDto MapBasketToDto(Basket basket)
    {
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.items.Select(item => new BasketItemDto
            {
                ProductId = item.Product.Id,
                Name = item.Product.Name,
                Brand = item.Product.Brand,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Quantity = item.Quantity,
                Type = item.Product.Type
            }).ToList()

        };
    }

}
