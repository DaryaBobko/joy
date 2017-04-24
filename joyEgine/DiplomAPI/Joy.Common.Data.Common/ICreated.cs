using System;

namespace Joy.Data.Common
{
    public interface ICreated
    {
        int CreatedBy { get; set; }

        DateTime CreatedOn { get; set; }
    }
}
