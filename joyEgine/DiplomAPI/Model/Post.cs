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
    
    public partial class Post: IEntity, ICreated	{
    	    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Post()
        {
            this.PostMediaContents = new HashSet<PostMediaContent>();
            this.Tags = new HashSet<Tag>();
        }
    
        public int Id { get; set; }
        public string Tittle { get; set; }
        public string ContentText { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public bool NeedVerify { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PostMediaContent> PostMediaContents { get; set; }
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Tag> Tags { get; set; }
    
    	public static Expression<Func<Post, int>> PrimaryKeySelector
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
