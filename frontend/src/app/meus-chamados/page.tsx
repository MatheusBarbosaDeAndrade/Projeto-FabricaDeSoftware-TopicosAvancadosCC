"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Chamado, getChamados } from "@/lib/chamados";

const statusLabel = {
  aberto: "Aberto",
  em_andamento: "Em análise",
  resolvido: "Resolvido",
};
const prioridadeLabel = { baixa: "Baixa", media: "Média", alta: "Alta" };

export default function MeusChamados() {
  const [chamados, setChamados] = useState<Chamado[]>([]);

  useEffect(() => setChamados(getChamados()), []);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link href="/" className="text-sm text-slate-600 hover:underline">
              ← Início
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              Meus chamados
            </h1>
            <p className="mt-2 text-slate-600">
              Acompanhe suas solicitações de suporte.
            </p>
          </div>
          <Link
            href="/novo-chamado"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            + Novo chamado
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {chamados.map((chamado) => (
            <Link
              key={chamado.id}
              href={`/chamado/${chamado.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:shadow"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    {chamado.id} · {chamado.categoria}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">
                    {chamado.titulo}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {chamado.descricao}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {statusLabel[chamado.status]}
                  </span>
                  <span className="text-xs text-slate-500">
                    Prioridade: {prioridadeLabel[chamado.prioridade]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
