using FlowerShop.Api.Data;
using FlowerShop.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        _logger.LogInformation("GetProducts was Invoked!");
        var res = await _dataContext.Products.ToListAsync();
        return Ok(res);
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
