
using System.Security.Principal;

namespace Joy.Data.Common
{
    public class DefinedIdentity : IIdentity
    {
        private const string AuthType = "Mock";

        public DefinedIdentity()
        {
            IsAuthenticated = false;
        }

        public DefinedIdentity(string name)
        {
            Name = name;
            AuthenticationType = AuthType;
            IsAuthenticated = true;
        }

        public string Name { get; set; }
        public string AuthenticationType { get; set; }
        public bool IsAuthenticated { get; set; }
    }
}