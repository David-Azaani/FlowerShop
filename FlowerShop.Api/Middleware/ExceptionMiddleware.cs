using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace FlowerShop.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _environment;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
    IHostEnvironment environment)
    {
        _next = next;
        _logger = logger;
        _environment = environment;
    }


    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {

            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;
            var response = new ProblemDetails
            {

                Detail = _environment.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                Status = 500,
                Title = ex.Message

            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);

        }

    }
}
