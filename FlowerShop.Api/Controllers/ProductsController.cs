using FlowerShop.Api.Data;
using FlowerShop.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerShop.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ILogger<ProductsController> _logger;


    private readonly DataContext dataContext;

    public ProductsController(ILogger<ProductsController> logger, DataContext dataContext)
    {
        this.dataContext = dataContext;


        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProduct()
    {
        var res = await dataContext.Products.ToListAsync();
        return Ok(res);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        var res = await dataContext.Products.SingleOrDefaultAsync(a => a.Id == id);
        if (res == null)
        {
            return NotFound();
        }
        else
        {
            return Ok(res);
        }

    }







}
