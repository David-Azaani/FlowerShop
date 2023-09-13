

using FlowerShop.Api.Entities;
using SQLitePCL;

namespace FlowerShop.Api.Extentions;

public static class ProductExtention
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)

    {

        if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
        query = orderBy switch
        {
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)   // _ means default!

        };
        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string serachTerm)
    {
        if (string.IsNullOrWhiteSpace(serachTerm)) return query;

        var lowerCaseSearchTerm = serachTerm.Trim().ToLower();
        return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));

    }
}
