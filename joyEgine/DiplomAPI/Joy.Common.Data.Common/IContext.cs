using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq.Expressions;

namespace Joy.Data.Common
{
    public enum ContextType : byte
    {
        Joy
    }

    public interface IContext
    {
        DbSet<TEntity> Set<TEntity>()
            where TEntity : class;

        void MarkEntryModified<TEntity>(TEntity entity)
            where TEntity : class;

        bool UpdateEntry<TEntity>(int id, TEntity entity)
            where TEntity : class;

        void UpdateEntryProperty<TEntity, TProperty>(TEntity entity, Expression<Func<TEntity, TProperty>> propertySelector, TProperty value)
            where TEntity : class;

        void UpdateEntryProperty<TEntity>(TEntity entity, string propertyName, object value)
            where TEntity : class;
        Database Database { get; }

        DbChangeTracker ChangeTracker { get; }

        int SaveChanges();
    }
    
}
