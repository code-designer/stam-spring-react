import { useState } from 'react'
import './App.css'
import Login from './Login/Login.jsx'
import Layout from './Components/Layout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListerAgrements from './agrements/autorisations/ListerAgrements.jsx'
import AjouterAgrement from './agrements/autorisations/AjouterAgrement.jsx'
import ListerPE from './permis-exploitation/titres/ListerPE.jsx'
import AjouterPE from './permis-exploitation/titres/AjouterPE.jsx'
import ListerPR from './permis-recherche/titres/ListerPR.jsx'
import AjouterPR from './permis-recherche/titres/AjouterPR.jsx'
import ListerProspections from './prospections/autorisations/ListerProspections.jsx'
import AjouterProspection from './prospections/autorisations/AjouterProspection.jsx'
import ListerDemandesPE from './permis-exploitation/demandes-nouvelles/ListerDemandesPE.jsx'
import AjouterDemandePE from './permis-exploitation/demandes-nouvelles/AjouterDemandePE.jsx'
import ListerDemandesPR from './permis-recherche/demandes-nouvelles/ListerDemandesPR.jsx'
import AjouterDemandePR from './permis-recherche/demandes-nouvelles/AjouterDemandePR.jsx'
import ListerDemandesAgrements from './agrements/demandes-nouvelles/ListerDemandesAgrements.jsx'
import AjouterDemandeAgrement from './agrements/demandes-nouvelles/AjouterDemandeAgrement.jsx'
import ListerDemandesProspections from './prospections/demandes-nouvelles/ListerDemandesProspections.jsx'
import AjouterDemandeProspection from './prospections/demandes-nouvelles/AjouterDemandeProspection.jsx'
import PDFPreview from './Components/PDFPreview.jsx'
import ValidationPR from './permis-recherche/demandes-nouvelles/ValidationPR.jsx'
import FondDossier from './permis-recherche/demandes-nouvelles/FondDossier.jsx'
import VoirDemandePR from './permis-recherche/demandes-nouvelles/VoirDemandePR.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/accueil",
        element: <div>Accueil <PDFPreview /> </div>
      },
      {
        path: "/permis-recherche/titres",
        element: <ListerPR />
      },
      {
        path: "/permis-recherche/titres/:id",
        element: <div>Display a PR</div>
      },
      {
        path: "/permis-recherche/titres/nouveau",
        element: <AjouterDemandePR />
      },
      {
        path: "/permis-recherche/titres/editer/:id",
        element: <div>Display a PR</div>
      },
      {
        path: "/permis-exploitation/titres",
        element: <ListerPE />
      },
      {
        path: "/permis-exploitation/titres/:id",
        element: <div>Display a PE</div>
      },
      {
        path: "/permis-exploitation/titres/nouveau",
        element: <AjouterPE />
      },
      {
        path: "/permis-exploitation/titres/editer/:id",
        element: <div>Display a PE</div>
      },
      {
        path: "/agrements/autorisations",
        element: <ListerAgrements />,
      },
      {
        path: "/agrements/autorisations/:id",
        element: <div>Display a agrement</div>,
      },
      {
        path: "/agrements/autorisations/nouveau",
        element: <AjouterAgrement />,
      },
      {
        path: "/agrements/autorisations/editer/:id",
        element: <div>Display a agrement</div>,
      },
      {
        path: "/prospections/autorisations",
        element: <ListerProspections />
      },
      {
        path: "/prospections/autorisations/:id",
        element: <div>Display a prospection</div>
      },
      {
        path: "/prospections/autorisations/nouveau",
        element: <AjouterProspection />
      },
      {
        path: "/prospections/autorisations/editer/:id",
        element: <div>Display a prospection</div>
      },
      {
        path: "/permis-recherche/demandes",
        element: <ListerDemandesPR />
      },
      {
        path: "/permis-recherche/demandes/:id/view",
        element: <VoirDemandePR option={"view"} />
      },
      {
        path: "/permis-recherche/demandes/:id/fiche-de-verification",
        element: <ValidationPR />
      },
      {
        path: "/permis-recherche/demandes/:id/fond-de-dossier",
        element: <FondDossier />
      },
      {
        path: "/permis-recherche/demandes/nouveau",
        element: <AjouterDemandePR option={true} />
      },
      {
        path: "/permis-recherche/demandes/:id/editer",
        element: <AjouterDemandePR option={true} />
      },
      {
        path: "/permis-exploitation/demandes",
        element: <ListerDemandesPE />
      },
      {
        path: "/permis-exploitation/demandes/:id",
        element: <div>Demande PE</div>
      },
      {
        path: "/permis-exploitation/demandes/nouveau",
        element: <AjouterDemandePE />
      },
      {
        path: "/permis-exploitation/demandes/editer/:id",
        element: <div>Demande PE</div>
      },
      {
        path: "/agrements/demandes",
        element: <ListerDemandesAgrements />
      },
      {
        path: "/agrements/demandes/:id",
        element: <div>Demande Agrement</div>
      },
      {
        path: "/agrements/demandesnouveau",
        element: <AjouterDemandeAgrement />
      },
      {
        path: "/agrements/demandesediter/:id",
        element: <div>Demande Agrement</div>
      },
      {
        path: "/prospections/autorisations",
        element: <ListerDemandesProspections />
      },
      {
        path: "/prospections/autorisations/:id",
        element: <div>Demande de prospection</div>
      },
      {
        path: "/prospections/autorisations/nouveau",
        element: <AjouterDemandeProspection />
      },
      {
        path: "/prospections/autorisations/editer/:id",
        element: <div>Demande de prospection</div>
      },
      {
        path: "/permis-recherche/renouvellements",
        element: <ListerPR />
      },
      {
        path: "/permis-recherche/renouvellements/:id",
        element: <div>Display a PR</div>
      },
      {
        path: "/permis-recherche/renouvellements/nouveau",
        element: <AjouterPR />
      },
      {
        path: "/permis-recherche/renouvellements/editer/:id",
        element: <div>Display a PR</div>
      },
      {
        path: "/permis-exploitation/renouvellements",
        element: <ListerDemandesPE />
      },
      {
        path: "/permis-exploitation/renouvellements/:id",
        element: <div>Demande PE</div>
      },
      {
        path: "/permis-exploitation/renouvellements/nouveau",
        element: <AjouterDemandePE />
      },
      {
        path: "/permis-exploitation/renouvellements/editer/:id",
        element: <div>Demande PE</div>
      },
      {
        path: "/agrements/renouvellements",
        element: <ListerAgrements />,
      },
      {
        path: "/agrements/renouvellements/:id",
        element: <div>Display a agrement</div>,
      },
      {
        path: "/agrements/renouvellements/nouveau",
        element: <AjouterAgrement />,
      },
      {
        path: "/agrements/renouvellements/editer/:id",
        element: <div>Display a agrement</div>,
      },
      {
        path: "/prospections/renouvellements",
        element: <ListerProspections />
      },
      {
        path: "/prospections/renouvellements/:id",
        element: <div>Display a prospection</div>
      },
      {
        path: "/prospections/renouvellements/nouveau",
        element: <AjouterProspection />
      },
      {
        path: "/prospections/renouvellements/editer/:id",
        element: <div>Display a prospection</div>
      },
      {
        path: "/statistiques",
        element: <div>statistiques</div>
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App
