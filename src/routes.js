import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Competences from "views/competences/listCompetence";
import FormationPrograms from "views/formation-programs/listFormationPrograms";
import RegisterFormationProgram from "views/formation-programs/registerFormationProgram";
import UpdateFormationProgram from "views/formation-programs/updateFormationPrograms";
import UpdateCompetence from "views/competences/updateCompetence";
import RegisterCompetence from "views/competences/RegisterCompetence";
import ListUser from "views/users/listUser";
import RegisterUser from "views/users/registerUser";
import UpdateUsers from "views/users/updateUser";

import LearningResults from 'views/learning-results/listLearningResults'
import UpdateLearningresult from "views/learning-results/updateLearningResults"
import RegisterLearningResult from "views/learning-results/registerLearningResults";
import ProgramCompetences from "views/formation-programs/programCompetences";
import Profile from "views/examples/Profile";

import ListContracts from "views/contracts/listContracts";
import RegisterContracts from "views/contracts/RegisterContract"
import UpdateContracts from "views/contracts/updateContract"


var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    sidebar: false,
  },
  // profile
  {
    path: "/profile",
    name: "Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    sidebar: false
  },

  // users

  {
    path: "/users",
    name: "Usuarios",
    icon: "ni ni-circle-08 text-dark",
    component: ListUser,
    layout: "/admin",
  },
  {
    path: "/updateusers/:id",
    name: "Actualizar Usuario",
    icon: "ni ni-single-copy-04 text-dark",
    component: UpdateUsers,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/registeruser",
    name: "Registrar Usuario",
    icon: "ni ni-single-copy-04 text-dark",
    component: RegisterUser,
    layout: "/admin",
    sidebar: false,
  },

  // users end

  // competences

  {
    path: "/competence",
    name: "Competencias",
    icon: "ni ni-collection text-dark",
    component: Competences,
    layout: "/admin",
  },
  {
    path: "/registerCompetence",
    name: "Registrar Competencia",
    icon: "ni ni-single-copy-04 text-dark",
    component: RegisterCompetence,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/updatecompetence/:id",
    name: "Actualizar Competencia",
    icon: "ni ni-single-copy-04 text-dark",
    component: UpdateCompetence,
    layout: "/admin",
    sidebar: false,
  },

  // competences end

  // formation programs
  {
    path: "/formationprograms",
    name: "Programas de formación",
    icon: "ni ni-books text-dark",
    component: FormationPrograms,
    layout: "/admin",
  },
  {
    path: "/formationprogramsregister",
    name: "Registrar programa de formación",
    icon: "ni ni-single-copy-04 text-dark",
    component: RegisterFormationProgram,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/updateformationprograms/:id",
    name: "Actualizar programa de formación",
    icon: "ni ni-single-copy-04 text-dark",
    component: UpdateFormationProgram,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/programcompetences/:id",
    name: "Gestionar competencias un programa de formación",
    icon: "ni ni-single-copy-04 text-dark",
    component: ProgramCompetences,
    layout: "/admin",
    sidebar: false,
  },
  // formation programs  end


  // Learning results 

  {
    path: "/learningresults/:id",
    name: "Resultados de Aprendizaje",
    icon: "ni ni-books text-dark",
    component: LearningResults,
    layout: "/admin",
    sidebar: false,
  },

  {
    path: "/RegisterLearningResult/:id",
    name: "Registrar Resultado de Aprendizaje",
    icon: "ni ni-single-copy-04 text-dark",
    component: RegisterLearningResult,
    layout: "/admin",
    sidebar: false,
  },

  {
    path: "/updatelearningresult/:id",
    name: "Actualizar Resultado de Aprendizaje",
    icon: "ni ni-single-copy-04 text-dark",
    component: UpdateLearningresult,
    layout: "/admin",
    sidebar: false,
  },
  // LearningResults end


  // contracts 

  {
    path: "/contracts/:id",
    name: "Contratos",
    icon: "ni ni-paper-diploma text-dark",
    component: ListContracts,
    layout: "/admin",
    sidebar: false,
  },

  {
    path: "/RegisterContracts/:id",
    name: "Registrar Un Contrato",
    icon: "ni ni-single-copy-04 text-dark",
    component: RegisterContracts,
    layout: "/admin",
    sidebar: false,
  },

  {
    path: "/updateleContracts/:id",
    name: "Actualizar Contrato",
    icon: "ni ni-single-copy-04 text-dark",
    component: UpdateContracts,
    layout: "/admin",
    sidebar: false,
  },
];
export default routes;
