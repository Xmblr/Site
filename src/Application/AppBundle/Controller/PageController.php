<?php

namespace Application\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PageController extends Controller
{
    public function indexAction()
    {
        return $this->render('ApplicationAppBundle:Page:index.html.twig');
    }
}