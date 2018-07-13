<?php

namespace Application\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Application\AppBundle\Entity\Call;
use Application\AppBundle\Form\CallType;
use Symfony\Component\HttpFoundation\Request;
use Swift_SmtpTransport;
use Swift_Mailer;
use Swift_Message;

class PageController extends Controller
{
    public function indexAction(Request $request)
    {
        $callform = $this->Call($request);

        return $this->render('ApplicationAppBundle:Page:index.html.twig', array(
            'callform' =>$callform->createView()
        ));
    }

    public function confirmAction(Request $request)
    {
        $callform = $this->Call($request);

        return $this->render('ApplicationAppBundle:Page:confirm.html.twig', array(
            'callform' =>$callform->createView()
        ));

    }

    public function Call($request)
    {
        $call = new Call();

        $callform = $this->createForm(CallType::class, $call);

        if ($request->isMethod($request::METHOD_POST)) {

            $callform->handleRequest($request);
            if ($callform->isValid()) {

                $this->Caller($call);

                $this->addFlash(
                    'success',
                    'Спасибо за оформление обратного звонка. Наши специалисты свяжутся с вами в ближайшее время.'
                );
            }
        }

        return $callform;

    }

    public function Caller($call)
    {
        $mailer = $this->Transport();

        // Create a message
        $message = Swift_Message::newInstance('Форма обратного звонка')
            ->setFrom(array('seo-newline@mail.ru' => 'Обратный звонок'))
            ->setTo('seo-newline@mail.ru')//->setTo($this->container->getParameter('gobusgo.emails.contact_email'))
            ->setBody($this->renderView('@ApplicationApp/Page/callEmail.txt.twig', array('call' => $call)));
        ;

        // Send the message
        $mailer->send($message);
    }

    public function Transport()
    {
        // Create the Transport
        $transport = Swift_SmtpTransport::newInstance(
            $this->container->getParameter('mailer_host'),
            $this->container->getParameter('mailer_port'),
            $this->container->getParameter('mailer_encryption')
        )
            ->setUsername($this->container->getParameter('mailer_user'))
            ->setPassword($this->container->getParameter('mailer_password'))
        ;

        // Create the Mailer using your created Transport
        return $mailer = Swift_Mailer::newInstance($transport);

    }
}