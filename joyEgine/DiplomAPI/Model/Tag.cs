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
    
    public partial class Tag: IEntity	{
    	    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tag()
        {
            this.PostTags = new HashSet<PostTag>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PostTag> PostTags { get; set; }
    
    	public static Expression<Func<Tag, int>> PrimaryKeySelector
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
