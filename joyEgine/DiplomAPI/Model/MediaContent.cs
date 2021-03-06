//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Model
{
    using System.Linq.Expressions;
    using Joy.Data.Common;
    using System;
    using System.Collections.Generic;
    
    public partial class MediaContent: IEntity	{
    	    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MediaContent()
        {
            this.PostMediaContents = new HashSet<PostMediaContent>();
            this.Users = new HashSet<User>();
        }
    
        public int Id { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
    
        public virtual MdiaContentType MdiaContentType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PostMediaContent> PostMediaContents { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> Users { get; set; }
    
    	public static Expression<Func<MediaContent, int>> PrimaryKeySelector
    	{
    		get { return x => x.Id; }
    	}
    
    	public int PrimaryKey
    	{
    	    get { return Id; }
    		set { Id = value; } 
    	}
    
    }
}
