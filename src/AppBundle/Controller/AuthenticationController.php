<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Wkop\Helpers;

class AuthenticationController extends Controller
{

    /**
     * @Route("/login", name="login")
     */
    public function login()
    {
        if($this->userWantsToLogIn())
            return $this->redirect($this->buildAuthUrl());

        return $this->register($_GET['connectData']);
    }

    public function register($data)
    {
        $data = json_decode(base64_decode($data));

        $user = $this->returnUserIfRegistered($data);
        if(is_null($user))
            $user = $this->addNewUser($data);

        $this->fillSessionWithUserDeatails($user);

        return new Response("User added with id ".$user->getId());
    }

    public function returnUserIfRegistered($data)
    {
        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findByUsername($data->login);

        return (!$user) ? null : $user[0];
    }

    public function buildAuthUrl()
    {
        return Helpers::getConnectUrl(
            $this->getParameter("wykop_auth_redirect_url"),
            $this->getParameter("wykop_public_key"),
            $this->getParameter("wykop_secret_key")
        );
    }

    public function userWantsToLogIn()
    {
        if(!isset($_GET['connectData']))
            return true;

        return false;
    }

    public function addNewUser($data)
    {
        $user = new User();
        $user->setUsername($data->login);
        $user->setToken($data->token);
        $user->setAdmin($data->login);
        $user->setUpdatedAt(new \DateTime("NOW"));
        $user->setCreatedAt(new \DateTime("NOW"));

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return $user;
    }

    public function fillSessionWithUserDeatails($user)
    {
        $session = new Session();
        $session->set("loggedIn", TRUE);
        $session->set("username", $user->login);
        $session->set("token", $user->token);

        return;
    }

}
