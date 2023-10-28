import { Link } from "react-router-dom"; 

function AiContent() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "15px",
          
        }}
      >
        <Link className="linkTag" to={"/ai-content"}>Ai PDF Content Generate </Link>
        <Link className="linkTag" to={"/ai-text"}>Ai Text Generate </Link>
        <Link className="linkTag" to={"/emotional"}>Emotional</Link>
      </div>
    </>
  );
}
export default AiContent;
