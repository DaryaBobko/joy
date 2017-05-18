using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace JoyBusinessService.Services.Implementations
{
    public class Principal : IPrincipal
    {
        public Principal(IIdentity identity)
        {
            Identity = identity;
        }
        public bool IsInRole(string role)
        {
            throw new NotImplementedException();
        }

        public IIdentity Identity { get; set; }
    }
}
