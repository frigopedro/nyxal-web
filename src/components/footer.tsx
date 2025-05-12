export default function Footer() {
  return (
    <footer className="mt-20 py-10 backdrop-blur-md bg-white/30 border-t border-white/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#2c1056] mb-4">Nyxal</h3>
            <p className="text-gray-700">
              Onde muitos enxergam software, nós vemos legado. Transformando
              grandes ambições em jornadas digitais perfeitas.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#2c1056] mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Resultados
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#2c1056] mb-4">
              Serviços
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Desenvolvimento
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Consultoria
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Gestão de Projetos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-[#4a2a7b]">
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#2c1056] mb-4">
              Contato
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-700">contato@nyxal.com</li>
              <li className="text-gray-700">+55 (00) 0000-0000</li>
              <li className="text-gray-700">São Paulo, Brasil</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-700">
            &copy; {new Date().getFullYear()} Nyxal. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
