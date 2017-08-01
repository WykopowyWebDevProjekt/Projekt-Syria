<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class IndexController extends Controller
{

    /**
     * @Route("/", name="homePage")
     */
    public function homepage()
    {
        return new Response("homepage");
    }
}
