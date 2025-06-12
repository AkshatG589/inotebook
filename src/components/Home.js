import Notes from "./Notes"
import AddNote from "./AddNote"
function Home() {
  return (
    <div>
      {/* this is to add notes*/}
      <AddNote />
      {/* this is to displaying all notes*/}
      <Notes />
    </div>
  );
}

export default Home;
