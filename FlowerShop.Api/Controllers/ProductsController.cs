using FlowerShop.Api.Data;
using FlowerShop.Api.Entities;
using FlowerShop.Api.Extentions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace FlowerShop.Api.Controllers;

// [ApiController]
// [Route("api/[controller]")]
public class ProductsController : BaseApiController
{

    private readonly DataContext _dataContext;

    public ProductsController(ILogger<ProductsController> logger, DataContext dataContext) : base(logger)
    {
        _dataContext = dataContext;

    }

    [HttpGet] // when we dont pass our param here << it means we have to use it as query string and that's what we need!
    public async Task<ActionResult<List<Product>>> GetProducts(string orderBy, string serachTerm, string brands, string types)
    {
        _logger.LogInformation("GetProducts was Invoked!");
        // var res = await _dataContext.Products.ToListAsync();
        var query = _dataContext
        .Products
        .Sort(orderBy)
        .Search(serachTerm)
        .Filter(brands, types)
        .AsQueryable();
        // this code  is not exceuted untile to list!


        // we have to use repository pattern to put  database logic outsite of controller!!+
        // one another was is using wxtention method ! usful for DRY
        // query = orderBy switch
        // {
        //     "price" => query.OrderBy(p => p.Price),
        //     "priceDesc" => query.OrderByDescending(p => p.Price),
        //     _ => query.OrderBy(p => p.Name)   // _ means default!

        // };
        return Ok(await query.ToListAsync());
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        _logger.LogInformation($"GetProduct with with id {id}  was Invoked!");
        var res = await _dataContext.Products.FindAsync(id);
        if (res == null) return NotFound();
        return Ok(res);

    }







}
