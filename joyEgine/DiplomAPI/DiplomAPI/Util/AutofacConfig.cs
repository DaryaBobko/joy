using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac.Integration.Mvc;
using System.Web.Mvc;
using Joy.Business.Services.Repositories;
using Joy.Data.Common;
using Model;
using Joy.OrderManager.Model.Context;
using System.Security.Principal;
using JoyBusinessService.Services.Implementations;
using JoyBusinessService.Services.Interfaces;
using System.Web.Http;
using Autofac.Integration.WebApi;
using System.Reflection;

namespace DiplomAPI.Util
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(WebApiApplication).Assembly);
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            RegisterTypes(builder);

            var container = builder.Build();

            var resolver = new AutofacDependencyResolver(container);
            DependencyResolver.SetResolver(resolver);
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container); //(IDependencyResolver)resolver;
            ServiceLocator.SetResolver(() => resolver.RequestLifetimeScope);
        }

        private static void RegisterTypes(ContainerBuilder builder)
        {
            builder.RegisterType<Repository>().As<IRepository>().InstancePerRequest();
            builder.Register(x => HttpContext.Current.User != null ? HttpContext.Current.User.Identity : new DefinedIdentity()).As<IIdentity>();
            builder.RegisterType<JoyEntities>().As<IContext>().As<IBaseContext>().InstancePerRequest();
            builder.RegisterType<ValueService>().As<IValueService>();
            builder.RegisterType<TagService>().As<ITagService>();
            builder.RegisterType<PostService>().As<IPostService>();
            //builder.RegisterType<UserContext>().As<IUserContext>().WithAttributeFilter().InstancePerRequest();

        }
    }
}