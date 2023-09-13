

using System.Text.Json;
using FlowerShop.Api.RequestHelpers;

namespace FlowerShop.Api.Extentions;

public static class HttpExtentions
{
    public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
    {

        var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }; // to have camelcase
        response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, option));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination"); //to have access from diffrent address and not only swagger
    }
}
