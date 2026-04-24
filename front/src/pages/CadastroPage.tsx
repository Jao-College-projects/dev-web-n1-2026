import { FormCadastro } from "../components/auth/FormCadastro";

export function CadastroPage(): JSX.Element {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-[440px] border border-stone-200/60 bg-white p-10 shadow-[0_8px_40px_-12px_rgba(28,25,23,0.10)]">
        <div className="border-t-2 border-gold-soft mb-8" />
        <FormCadastro />
      </div>
    </div>
  );
}
