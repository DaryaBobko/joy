using System;
using System.Collections.Generic;
using System.IO;
using DevTeam.FileFormatter;
using Joy.Business.Services.Repositories;
using JoyBusinessService.Enums;
using Model;

namespace JoyBusinessService.Services
{
    public static class FileSaverService
    {
        public static string SaveFile(List<FileContent> images)
        {
            images[0].Name = images[0].Name.Replace("\"", "");
            var path = AppDomain.CurrentDomain.BaseDirectory;
            path = Directory.GetParent(path).Parent.Parent.FullName;

            path = Path.Combine(path, "DiplomWEB\\content\\dynamicFiles", images[0].Name);
            File.WriteAllBytes(path, images[0].Content);
            return path;
        }

        public static int SaveModelFile(List<FileContent> images, IRepository _repository)
        {
            var fileName = SaveFile(images);
            var file = new MediaContent()
            {
                Name = images[0].Name,
                Path = fileName,
                TypeId = (int)MeidaContentType.Image
            };
            _repository.Add(file);
            _repository.Commit();
            return file.Id;
        }
    }
}