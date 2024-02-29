import { GoHome,GoPeople } from "react-icons/go";
import { BsImages } from "react-icons/bs";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";

export const sidebarLinks = [
    {
      route: "/",
      label: "Home",
      icon:  (<GoHome/>),
    },
    {
      route: "/explore",
      label: "Explore",
      icon: <LuImagePlus/>,
    },
    {
      icon: <GoPeople/>,
      route: "/all-users",
      label: "People",
    },
    {
      icon: <BiSolidBookmarkHeart/>,
      route: "/saved",
      label: "Saved",
    },
    {
      icon: <BsImages/>,
      route: "/create-post",
      label: "Create Post",
    },
  ];
  
  export const bottombarLinks = [
    {
      imgURL: "/assets/icons/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/icons/wallpaper.svg",
      route: "/explore",
      label: "Explore",
    },
    {
      imgURL: "/assets/icons/bookmark.svg",
      route: "/saved",
      label: "Saved",
    },
    {
      imgURL: "/assets/icons/gallery-add.svg",
      route: "/create-post",
      label: "Create",
    },
  ];