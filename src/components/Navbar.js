import React from 'react'
const Navbar = () => {
  return (
<>
<div className=''>
<nav  className="bg-blue-300	">
  {/* <a class="navbar-brand" href='/'>Navbar</a> */}
<a href='/'>
<div className='d-flex align-items-center'>
  <img style={{width:'60px',height:'60px'}} src="https://icon-library.com/images/home-icon-transparent-background/home-icon-transparent-background-3.jpg" alt=""/>
  <h1 className='text-5xl ms-3 text-neutral-950	font-light	is-family-code'>D<span className='text-yellow-200 text-5xl'>ream</span>Homes</h1>
  </div>
</a>
  
</nav>
</div>
</>
  )
}

export default Navbar