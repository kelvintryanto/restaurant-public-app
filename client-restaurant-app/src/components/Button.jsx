export function Button({ name }) {
  return <button className="border border-white-900 hover:bg-yellow-800 rounded-md px-2 py-1 flex-1">{name}</button>;
}

export function ButtonPage({ number }) {
  return <button className="hover:bg-yellow-800 px-2 py-1 flex-1 border-2 mx-2">{number}</button>;
}
