import { Link } from "react-router-dom";

function Days() {
  return (
    <>
      <h1 style={{textAlign:'center', marginBottom:"50px"}}>Assignments</h1>

     <div className="home-Main">
            <button > <Link to={"/sayari-generater"} >Day 0</Link> </button>
            <button> <Link to={"/code-convert"} >Day 1</Link> </button>
            <button> <Link to={"/ai-content-main"} >Day 2</Link> </button>
            <button> <Link to={"/day3"} >Day 3</Link> </button>
            <button> <Link to={"/day4"} >Day 4</Link> </button>
     </div>
    </>
  );
}
export default Days;
