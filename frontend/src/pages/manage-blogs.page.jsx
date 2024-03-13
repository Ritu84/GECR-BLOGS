import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { UserContext } from '../App'
import { filterPaginationData } from '../common/filter-pagination-data'
import {Toaster,toast} from "react-hot-toast"
import InPageNavigation from '../components/inpage-navigation.component'
import Loader from '../components/loader.component'
import NoDataMessage from '../components/nodata.component'
import AnimationWrapper from '../common/page-animation'
import {ManagePublishedBlogCard} from "../components/manage-blogcard.component"
import {ManageDraftBlogPost} from "../components/manage-blogcard.component"
import LoadMoreDataBtn from '../components/load-more.component'
import { useSearchParams } from 'react-router-dom'

const ManageBlogs = () => {

   const [blogs, setBlogs] = useState(null)
   const [drafts, setDrafts] = useState(null)
   const [query, setQuery] = useState("")

   let activeTab = useSearchParams()[0].get("tab");

   let {userAuth:{access_token}} = useContext(UserContext);

const getBlogs=({page,draft,deletedDocCount=0})=>{

    axios.post(import.meta.env.VITE_SERVER_DOMAIN+ "/user-written-blogs",{
        page,draft,query,deletedDocCount
    },{
        headers:{
            'Authorization' : `Bearer ${access_token}`
        }
    })
    .then(async ({data})=>{
        // console.log("Data from server:", data); 

        let formatedData= await filterPaginationData({
            state:draft ? drafts : blogs,
            data:data.blogs,
            page,
            user: access_token,
            countRoute: "user-written-blogs-count",
            data_to_send:{draft,query}
        })
        // console.log(formatedData);

        if(draft){
            setDrafts(formatedData);
        }else{
            setBlogs(formatedData)
        }
    })
    .catch(err=>{
        console.log(err);
    })

   }

  useEffect(()=>{
    if(access_token){
        if(blogs==null){
           
           getBlogs({page:1, draft:false})
        }
        if(drafts==null){
            getBlogs({page:1, draft:true})
        }
    }
   },[access_token,blogs,drafts,query])

   const handleSearch=(e)=>{
    let searchQuery = e.target.value;

    setQuery(searchQuery);

    if(e.keyCode==13 && searchQuery.length){
       setBlogs(null);
       setDrafts(null);
    }
    
   }

   const handleChange=(e)=>{
    if(!e.target.value.length){
        setQuery("")
        setBlogs(null);
        setDrafts(null);
    }

   }

  return (
    <>
      <h1 className='max-md:hidden'>Manage Blogs</h1>
      <Toaster/>

      <div className='relative max-md:mt-5 md:mt-8 mb-10'>
        
        <input 
        className='w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey'
        type='search'
        placeholder='Search Blogs'
        onChange={handleChange}
        onKeyDown={handleSearch}
        />

        <i className='fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 
        top-[14px] -translation-y-1/2 text-xl text-dark-grey  '></i>
         
      </div>

      <InPageNavigation routes={['Published Blogs','Drafts']} defaultActiveIndex={activeTab != 'draft'? 0 : 1}>
        
 
        
        {
            
            // published blogs display
            blogs==null ? <Loader/> :
            blogs.results.length ? 
            <>
              {
                 blogs.results.map((blog,i)=>{
                    return <AnimationWrapper key={i} transition={{delay: i*0.04}} >

                       <ManagePublishedBlogCard blog={{...blog,index:i, setStateFunc:setBlogs }} />

                       

                    </AnimationWrapper>
                 })
              }
              <LoadMoreDataBtn state={blogs} fetchDatafn={getBlogs} additionalParam={{draft:false, deletedDocCount:blogs.deletedDocCount}}  />
            </>
             
            : <NoDataMessage message="No Published blogs"/>
        }
        {
            
            // draft blogs display
            drafts==null ? <Loader/> :
            drafts.results.length ? 
            <>
              {
                 drafts.results.map((blog,i)=>{
                    return <AnimationWrapper key={i} transition={{delay: i*0.04}} >

                       <ManageDraftBlogPost blog={{...blog,index:i, setStateFunc:setDrafts}}  />

                       

                    </AnimationWrapper>
                 })
              }
              <LoadMoreDataBtn state={drafts} fetchDatafn={getBlogs} additionalParam={{draft:true, deletedDocCount:drafts.deletedDocCount}}  />
            </>
             
            : <NoDataMessage message="No Draft blogs"/>
        }

      </InPageNavigation>
    </>
  )
}

export default ManageBlogs