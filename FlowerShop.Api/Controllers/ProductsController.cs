using System.Text.Json;
using FlowerShop.Api.Data;
using FlowerShop.Api.Entities;
using FlowerShop.Api.Extentions;
using FlowerShop.Api.RequestHelpers;
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

    [HttpGet] // when we dont pass our param here << it means we have to use it as query string and that's what we need!
    // note : if we pass the obj to entry of an antion we have to pass it from api with body and
    // we dont want it so to get it from query we aff [fromquery]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
    {
        _logger.LogInformation("GetProducts was Invoked!");
        // var res = await _dataContext.Products.ToListAsync();
        var query = _dataContext
        .Products
        .Sort(productParams.OrderBy)
        .Search(productParams.SearchTerm)
        .Filter(productParams.Brands, productParams.Types)
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
        var product = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
        // Response.Headers.Add("Pagination", JsonSerializer.Serialize(product.MetaData)); 
        // this return us Pascal Case but this dosent work in api and json!
        // so we need to adjust it! before  pagination: {"CurrentPage":1,"TotalPages":1,"PageSize":6,"TotalCount":1} 
        // after                            pagination: {"currentPage":1,"totalPages":1,"pageSize":6,"totalCount":1} 
        Response.AddPaginationHeader(product.MetaData);
        return Ok(product);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        _logger.LogInformation($"GetProduct with with id {id}  was Invoked!");
        var res = await _dataContext.Products.FindAsync(id);
        if (res == null) return NotFound();
        
        return Ok(res); // || return res

    }

    [HttpGet("filters")]

    // ActionResult return obj | status code vs IActionResult  status and not type safety like product!
    public async Task<IActionResult> GetFulters()
    {

        var brnads = await _dataContext.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _dataContext.Products.Select(p => p.Type).Distinct().ToListAsync();

        return Ok(new { brnads, types });

    }






}
