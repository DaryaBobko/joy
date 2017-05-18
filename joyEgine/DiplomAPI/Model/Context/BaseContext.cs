using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Security.Principal;
using Joy.Data.Common;
using Model;
using Joy.OrderManager.Model.Context;
using Model.Context;

namespace Joy.OrderManager.Model.Context
{
    public abstract class BaseContext : EfContext, IBaseContext
    {
        private readonly IIdentity _identity;

        protected BaseContext(string name, IIdentity identity)
            : base(name)
        {
            _identity = identity;
            this.Configuration.LazyLoadingEnabled = false;
        }

        private User _user;
        public User User
        {
            get
            {
                if (_user == null)
                {
                    var userName = _identity.Name;

                    if (string.IsNullOrWhiteSpace(userName))
                        return null;

                    var userId = Convert.ToInt32(userName);

                    _user = Set<User>().FirstOrDefault(x => x.Id == userId);
                }

                return _user;
            }
        }

        protected void SetModifier(ObjectStateEntry entry)
        {
            //if (entry.State != EntityState.Modified && entry.State != EntityState.Added) return;

            //var modified = entry.Entity as IModified;
            //if (modified != null)
            //{
            //    modified.ModifiedBy = User.Id;
            //    modified.ModifiedOn = DateTime.UtcNow;
            //}
        }

        protected void SetCreator(ObjectStateEntry entry)
        {
            if (entry.State != EntityState.Added) return;

            var created = entry.Entity as ICreated;
            if (created != null)
            {
                if (created.CreatedBy == 0)
                {
                    created.CreatedBy = User.Id;
                }
                created.CreatedOn = DateTime.UtcNow;
            }
        }

        protected void SetSoftDelete(ObjectStateEntry entry)
        {
            if (entry.State == EntityState.Deleted && entry.Entity is IDeleted)
            {
                entry.ChangeState(EntityState.Modified);
                (entry.Entity as IDeleted).IsDeleted = true;

                SetModifier(entry);
            }
        }

        protected void BeforeSave(List<ObjectStateEntry> entries, Queue<EntityState> states)
        {
            ChangeTracker.DetectChanges();

            var publishedEntries = (this as IObjectContextAdapter).ObjectContext.ObjectStateManager
                .GetObjectStateEntries(EntityState.Added | EntityState.Modified | EntityState.Deleted)
                .ToList();

            var newEntries = publishedEntries.Except(entries).ToList();

            if (newEntries.Any())
            {
                foreach (var entry in newEntries)
                {
                    var state = entry.State;

                    states.Enqueue(state);

                    //SetCreator(entry);
                    //SetModifier(entry);
                    //SetSoftDelete(entry);
                    
                }

                BeforeSave(publishedEntries, states);
            }
        }

        protected void AfterSave(Queue<EntityState> states)
        {
            ChangeTracker.DetectChanges();

            var publishedEntries = (this as IObjectContextAdapter).ObjectContext.ObjectStateManager
                .GetObjectStateEntries(EntityState.Added | EntityState.Modified | EntityState.Deleted)
                .ToList();

            foreach (var entry in publishedEntries)
            {
                var state = states.Peek();
            }
        }

        public override int SaveChanges()
        {
            var states = new Queue<EntityState>();

            BeforeSave(new List<ObjectStateEntry>(), states);

            var result = base.SaveChanges();

            AfterSave(states);

            return result;
        }
    }
}
