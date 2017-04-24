using Joy.Data.Common;
using Model;

namespace Joy.OrderManager.Model.Context
{
    public interface IBaseContext : IContext
    {
        User User { get; }
    }
}
