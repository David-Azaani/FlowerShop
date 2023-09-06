using FlowerShop.Api.Data;
using FlowerShop.Api.Middleware;
using Microsoft.EntityFrameworkCore;
// Ordering is not important here!
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(opt =>
{

    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
// this must be first!
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseCors(opt =>
{
    opt.AllowAnyHeader() // Use Headers
    .AllowAnyMethod()    // Use any methods
    .AllowCredentials() // use Cookie in out
    .WithOrigins("http://localhost:3000"); // this specific url
});
app.UseAuthorization();

app.MapControllers();
#region  Seeding Data


///Create Scope
var scope = app.Services.CreateScope();
///Create  context
var context = scope.ServiceProvider.GetRequiredService<DataContext>();
///Create  logger
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    //Createing database if it dosent exist!
    context.Database.Migrate();
    //Migrating data
    DbInitializer.InitializeData(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem occured during the migration!");

}
#endregion
app.Run();
