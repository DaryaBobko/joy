using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Joy.Data.Common;

namespace Joy.OrderManager.Model.Context
{
    public class EfContext : DbContext, IContext
    {
        protected EfContext(string name)
            : base(name)
        { }

        public void MarkEntryModified<TEntity>(TEntity entity)
            where TEntity : class
        {
            var entry = Entry(entity);
            entry.State = EntityState.Modified;
        }

        public bool UpdateEntry<TEntity>(int id, TEntity entity)
            where TEntity : class
        {
            var local = Set<TEntity>().Local.Cast<IEntity>().FirstOrDefault(x => x.PrimaryKey == id);
            if (local != null)
            {
                Entry(local).CurrentValues.SetValues(Entry(entity).Entity);
                return true;
            }
            return false;
        }

        public void UpdateEntryProperty<TEntity, TProperty>(TEntity entity, Expression<Func<TEntity, TProperty>> propertySelector, TProperty value)
            where TEntity : class
        {
            Entry(entity).Property(propertySelector).CurrentValue = value;
        }

        public void UpdateEntryProperty<TEntity>(TEntity entity, string propertyName, object value)
            where TEntity : class
        {
            Entry(entity).Property(propertyName).CurrentValue = value;
        }
    }
}
