using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Models;
using JoyBusinessService.Services.Interfaces;
using Model;

namespace JoyBusinessService.Services.Implementations
{
    public class TagService : ITagService
    {

        private readonly IRepository _repository;
        public TagService(IRepository repository)
        {
            _repository = repository;
        }

        public int AddTag(IdNameModel tag)
        {
            var entry = new Tag() {Id = tag.Id, Name = tag.Name};
            _repository.Add(entry);
            _repository.Commit();
            return entry.Id;
        }

        public List<IdNameModel> GetAll()
        {
            var list = _repository.GetList<Tag>().ToList();
            var tags = list.Select(tag => new IdNameModel() {Id = tag.Id, Name = tag.Name}).ToList();
            return tags;
        }
    }
}
