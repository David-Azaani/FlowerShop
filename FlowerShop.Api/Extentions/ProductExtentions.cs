

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
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
    {

        var brandList = new List<string>();
        var typeList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
            brandList.AddRange(brands.ToLower().Split(",").ToList()); // <<< point
        if (!string.IsNullOrEmpty(types))
            typeList.AddRange(types.ToLower().Split(",").ToList());

        query = query.Where(p => brandList.Count() == 0 || brandList.Contains(p.Brand.ToLower()));
        query = query.Where(p => typeList.Count() == 0 || typeList.Contains(p.Type.ToLower()));


        return query;


    }


}
