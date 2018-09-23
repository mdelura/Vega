namespace Vega.Core
{
    public interface IRepository<T> where T: class
    {
        void Add(T item);
        void Remove(T item);
    }
}