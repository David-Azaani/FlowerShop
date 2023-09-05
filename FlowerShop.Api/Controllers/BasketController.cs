using FlowerShop.Api.Data;
using FlowerShop.Api.Entities;
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

    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
        var basket = await _dataContext.Baskets
        .Include(x => x.items)
        .ThenInclude(x => x.Product)
        .FirstOrDefaultAsync(x => x.BuyerId == (Request.Cookies["buyerId"]));
        if (basket == null) return NotFound();

        return basket;
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {

        //Get Basket
        //Create Basket
        //Get product
        //add item
        //Save
        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
        //Get Basket
        //remove item or reduce quantity
        //save change

        return Ok();

    }




}
