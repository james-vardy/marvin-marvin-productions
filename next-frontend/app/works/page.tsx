export default function Works() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <table className="table-auto border-separate border-spacing-2 border border-slate-400 px-2 py-2">
        <thead>
          <tr>
            <th className="border border-slate-300 px-2 py-2">Song</th>
            <th className="border border-slate-300 px-2 py-2">Artist</th>
            <th className="border border-slate-300 px-2 py-2">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 px-2 py-2">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="border border-slate-300 px-2 py-2">
              Malcolm Lockyer
            </td>
            <td className="border border-slate-300 px-2 py-2">1961</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-2 py-2">Witchy Woman</td>
            <td className="border border-slate-300 px-2 py-2">The Eagles</td>
            <td className="border border-slate-300 px-2 py-2">1972</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-2 py-2">Shining Star</td>
            <td className="border border-slate-300 px-2 py-2">
              Earth, Wind, and Fire
            </td>
            <td className="border border-slate-300 px-2 py-2">1975</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
