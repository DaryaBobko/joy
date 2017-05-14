using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JoyBusinessService.Models;

namespace JoyBusinessService.Services.Interfaces
{
    public interface ITagService
    {
        List<IdNameModel> GetAll();

        int AddTag(IdNameModel tag);
    }
}
