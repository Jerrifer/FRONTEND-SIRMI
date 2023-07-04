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
import ProgramCompetences from "views/formation-programs/programCompetences";
import Profile from "views/examples/Profile";

import ListContracts from "views/contracts/listContracts";
import RegisterContracts from "views/contracts/RegisterContract"
import UpdateContracts from "views/contracts/updateContract"

import otheractivity from "views/other-activity/listOtheractivity"
import registerOtherActivity from "views/other-activity/RegisterOtheractivity";
import Updateotheractivity from "views/other-activity/updateOtheractivity";

import ListTitledFormations from "views/titled-formations/listTitledFormations";
import RegisterTitledFormation from "views/titled-formations/RegisterTitledFormation";
import UpdateTitledFormation from "views/titled-formations/updateTitledFormation";

import Rmi from "views/titled-formations/rmi";

import ListRmi from "views/RMI/listRmi";

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

   // end contracts

  //RMI

  {
    path: "/list-rmi",
    name: "Rmi's",
    icon: "ni ni-bullet-list-67 text-dark",
    component: ListRmi,
    layout: "/admin",
  },

  {
    path: "/rmi",
    icon: "ni ni-single-copy-04 text-dark",
    component: Rmi,
    layout: "/rmi",
    sidebar: false,
  },

    // titled formation 
    {
      path: "/titledformations/:id",
      name: "Formaciones tituladas",
      icon: "ni ni-bullet-list-67 text-dark",
      component: ListTitledFormations,
      layout: "/admin",
      sidebar: false,
    },
  
    {
      path: "/registertitledformation/:id",
      name: "Registrar Formacion Asignada",
      icon: "ni ni-single-copy-04 text-dark",
      component: RegisterTitledFormation,
      layout: "/admin",
      sidebar: false,
    },
  
    {
      path: "/updatetitledformation/:id",
      name: "ActualizarFormacion Asignada",
      icon: "ni ni-single-copy-04 text-dark",
      component: UpdateTitledFormation,
      layout: "/admin",
      sidebar: false,
    },
  
    // end titled formation 

     // otheractivity
     {
      path: "/otheractivity",
      name: "Otras actividades",
      icon: "",
      component: otheractivity,
      layout: "/admin",
    },
  
    {
      path: "/registerOtheractivity",
      name: "Registrar actividad",
      icon: "ni ni-single-copy-04 text-dark",
      component: registerOtherActivity,
      layout: "/admin",
      sidebar: false,
    },
  
    {
      path: "/updateotheractivity/:id",
      name: "Actualizar actividad",
      icon: "ni ni-single-copy-04 text-dark",
      component: Updateotheractivity,
      layout: "/admin",
      sidebar: false,
    },

];
export default routes;
