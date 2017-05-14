using System;

namespace Joy.Data.Common
{
    public interface IModified
    {
        int ModifiedBy { get; set; }

        DateTime ModifiedOn { get; set; }
    }
}