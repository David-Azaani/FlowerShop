using FlowerShop.Api.Entities;
using Microsoft.EntityFrameworkCore;
namespace FlowerShop.Api.Controllers;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }


    public DbSet<Product> Products { get; set; }
}
