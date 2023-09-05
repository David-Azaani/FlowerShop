namespace FlowerShop.Api.Entities;

public class Basket
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> items { get; set; } = new();



    public void AddItem(Product product, int quantity)
    {
        if (items.All(item => item.ProductId != product.Id))
        {
            items.Add(new BasketItem { Product = product, Quantity = quantity });
        }
        var existedItem = items.FirstOrDefault(item => item.Id == product.Id);
        if (existedItem != null) existedItem.Quantity += quantity;

    }

    public void RemoveItem(int productId, int quantity)
    {

        var Item = items.FirstOrDefault(item => item.Id == productId);
        if (Item == null) return;
        Item.Quantity -= quantity;
        if (Item.Quantity == 0) items.Remove(Item);

    }

}
