export default function Server({ server }) {
  return <h1 className={"text-xl"}>{server && server.title}</h1>;
}
