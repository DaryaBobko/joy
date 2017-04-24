using Joy.Business.Services.Repositories;
using JoyBusinessService.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoyBusinessService.Services.Implementations
{
    public class ValueService : IValueService
    {
        private readonly IRepository _repository;

        public ValueService(IRepository repository)
        {
            _repository = repository;
        }

        public string GetOne()
        {
            return "value from service";
        }
    }
}
