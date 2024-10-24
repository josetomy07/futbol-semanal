import { Link, useForm } from '@inertiajs/react';
import { Button, Label, Modal } from 'flowbite-react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import '../../../public/css/font-awesome.min.css';
import '../../../public/css/owl.carousel.min.css';
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup/dist/magnific-popup.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../../public/js/jquery.magnific-popup.min.js';
import 'mixitup/dist/mixitup.min.js';
import '../../../public/js/masonry.pkgd.min.js';
import 'slicknav/dist/jquery.slicknav.min.js';
import 'owl.carousel/dist/owl.carousel.min.js';



export default function Welcome({ auth, laravelVersion, phpVersion, status  }) {

    (function ($) {

        /*------------------
            Preloader
        --------------------*/

        $(window).on('load', function () {
            $(".loader").fadeOut();
            $("#preloder").delay(200).fadeOut("slow");

            /*------------------
                Portfolio filter
            --------------------*/
            $('.portfolio__filter li').on('click', function () {
                $('.portfolio__filter li').removeClass('active');
                $(this).addClass('active');
            });

            if ($('.portfolio__gallery').length > 0) {
                var containerEl = document.querySelector('.portfolio__gallery');
                var mixer = mixitup(containerEl);
            }
        });

        /*------------------
            Background Set
        --------------------*/
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            $(this).css('background-image', 'url(' + bg + ')');
        });

        //Masonary

        $('.work__gallery').masonry({
            itemSelector: '.work__item',
            columnWidth: '.grid-sizer',
            gutter: 10
        });


        /*------------------
            Navigation
        --------------------*/
        $(".mobile-menu").slicknav({
            prependTo: '#mobile-menu-wrap',
            allowParentLinks: true
        });

        /*------------------
            Hero Slider
        --------------------*/
        $('.hero__slider').owlCarousel({
            loop: true,
            dots: true,
            mouseDrag: false,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            items: 1,
            margin: 0,
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true,
        });

        var dot = $('.hero__slider .owl-dot');
        dot.each(function () {
            var index = $(this).index() + 1;
            if (index < 10) {
                $(this).html('0').append(index);
            } else {
                $(this).html(index);
            }
        });

        /*------------------
            Testimonial Slider
        --------------------*/
        $(".testimonial__slider").owlCarousel({
            loop: true,
            margin: 0,
            items: 3,
            dots: true,
            dotsEach: 2,
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true,
            responsive: {
                992: {
                    items: 3
                },
                768: {
                    items: 2
                },
                320: {
                    items: 1
                }
            }
        });

        /*------------------
            Latest Slider
        --------------------*/
        $(".latest__slider").owlCarousel({
            loop: true,
            margin: 0,
            items: 3,
            dots: true,
            dotsEach: 2,
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true,
            responsive: {
                992: {
                    items: 3
                },
                768: {
                    items: 2
                },
                320: {
                    items: 1
                }
            }
        });

        /*------------------
            Logo Slider
        --------------------*/
        $(".logo__carousel").owlCarousel({
            loop: true,
            margin: 100,
            items: 6,
            dots: false,
            smartSpeed: 1200,
            autoHeight: false,
            autoplay: true,
            responsive: {
                992: {
                    items: 5
                },
                768: {
                    items: 4
                },
                480: {
                    items: 3
                },
                320: {
                    items: 2
                }
            }
        });

        /*------------------
            Video Popup
        --------------------*/
        $('.video-popup').magnificPopup({
            type: 'iframe'
        });

        /*------------------
            Counter
        --------------------*/
        $('.counter_num').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });

    })(jQuery);


    const [openModal, setOpenModal] = useState(false);
    const confirmUserDeletion = () => {
        setOpenModal(true);
    };
    const onCloseModal = () => {
        setOpenModal(false);
        clearErrors();
        reset();
    };


    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });


    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };



    return (
        <>
            <div id="">
                <div className="loader"></div>
            </div>

            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2">
                            <div className="header__logo">
                                <a href=""></a>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="header__nav__option">

                                <nav className="header__nav__menu mobile-menu">
                                    <ul>
                                        <li><a href="./index.html"><i className="bi bi-house-door-fill"></i></a></li>
                                        <li><a href="./portfolio.html">Blog</a></li>
                                        <li><a href="#">Localidad</a>
                                            <ul className="dropdown">
                                                <li><a href="./about.html">Cipolletti</a></li>
                                                <li><a href="./portfolio.html">Neuquen</a></li>
                                                <li><a href="./blog.html">Centenario</a></li>
                                                <li><a href="./blog-details.html">Fernandez Oro</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="">Reserva</a></li>
                                        {auth.user ? (
                                            <li><Link href={route('dashboard')}>Home</Link></li>
                                            ) : (
                                            <>
                                                <li>
                                                    <button onClick={confirmUserDeletion}><span className='text-white'>LOGIN</span></button>
                                                    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                                        <Modal.Header />
                                                        <Modal.Body>

                                                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                                                            <form onSubmit={submit}>

                                                                <div className="container space-y-6">

                                                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Inicia sesión en nuestra plataforma</h3>

                                                                    <div>
                                                                        <div className="mb-2 block">
                                                                            <Label htmlFor="email" value="Ingrese su Correo" />
                                                                        </div>
                                                                        <TextInput
                                                                            id="email"
                                                                            className="w-full"
                                                                            value={data.email}
                                                                            isFocused={true}
                                                                            onChange={(e) => setData('email', e.target.value)}
                                                                            required
                                                                        />
                                                                        <InputError message={errors.email} className="mt-2" />
                                                                    </div>

                                                                    <div>
                                                                        <div className="mb-2 block">
                                                                            <Label htmlFor="password" value="Ingrese su Contraseña" />
                                                                        </div>
                                                                        <TextInput
                                                                            id="password"
                                                                            type="password"
                                                                            className="w-full"
                                                                            value={data.password}
                                                                            onChange={(e) => setData('password', e.target.value)}
                                                                            required
                                                                        />
                                                                        <InputError message={errors.password} className="mt-2" />
                                                                    </div>

                                                                    <Button type='submit' className="w-full" disabled={processing}>Iniciar sesión</Button>

                                                                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                                                        No esta registrarse?&nbsp;
                                                                        <Link href={route('register')}>Crear tu cuenta</Link>
                                                                    </div>
                                                                </div>

                                                            </form>

                                                        </Modal.Body>
                                                    </Modal>
                                                </li>
                                                <li><Link href={route('register')}>Registro</Link></li>
                                            </>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </header>

            <section className="hero">
                <div className="hero__slider owl-carousel">
                    <div className="hero__item set-bg" data-setbg="img/hero/eldies1.png">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text">
                                        <span>Nuevo Portal del</span>
                                        <h2>Deporte</h2>
                                        <a href="#" className="primary-btn">See more about us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero__item set-bg" data-setbg="img/hero/cuantoM2.png">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text">
                                        <span>Reserva tu Turno en Nuestros</span>
                                        <h2>predios</h2>
                                        <a href="#" className="primary-btn">See more about us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero__item set-bg" data-setbg="img/hero/sedes1.png">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text">
                                        <span>Seguinos en Nuestros</span>
                                        <h2>Sitio Web</h2>
                                        <a href="#" className="primary-btn">See more about us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="counter">
                <div className="container">
                    <div className="counter__content">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="counter__item">
                                    <div className="counter__item__text">
                                        <img src="img/icons/ci-1.png" alt="" />
                                        <h2 className="counter_num">230</h2>
                                        <p>Complejo Adherido</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="counter__item second__item">
                                    <div className="counter__item__text">
                                        <img src="img/icons/ci-2.png" alt="" />
                                        <h2 className="counter_num">1068</h2>
                                        <p>Clientes Activos</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="counter__item third__item">
                                    <div className="counter__item__text">
                                        <img src="img/icons/ci-3.png" alt="" />
                                        <h2 className="counter_num">260</h2>
                                        <p>Reservas Realizadas</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="counter__item four__item">
                                    <div className="counter__item__text">
                                        <img src="img/icons/ci-4.png" alt="" />
                                        <h2 className="counter_num">270</h2>
                                        <p>Localidades</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="team spad set-bg" data-setbg="img/team-bg.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title team__title">
                                <span>Conoce</span>
                                <h2>Nuestros Predios</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                            <div className="team__item set-bg" data-setbg="img/team/team-6.png">
                                <div className="team__item__text">
                                    <h4>Capataz Del Sur</h4>
                                    <p>Cipolletti</p>
                                    <div className="team__item__social">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                            <div className="team__item team__item--second set-bg" data-setbg="img/team/team-7.png">
                                <div className="team__item__text">
                                    <h4>S.T.I.H.M.P.R.A</h4>
                                    <p>Fernandez Oro</p>
                                    <div className="team__item__social">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                            <div className="team__item team__item--third set-bg" data-setbg="img/team/team-8.png">
                                <div className="team__item__text">
                                    <h4>Club Cinco Salto</h4>
                                    <p>Cinco Salto</p>
                                    <div className="team__item__social">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 p-0">
                            <div className="team__item team__item--four set-bg" data-setbg="img/team/team-9.png">
                                <div className="team__item__text">
                                    <h4>Los Gigantes</h4>
                                    <p>Neuquen</p>
                                    <div className="team__item__social">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-dribbble"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 p-0">
                            <div className="team__btn">
                                <a href="#" className="primary-btn">Meet Our Team</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="latest spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title center-title">
                                <span>Nuestro</span>
                                <h2>Blog Actualizado</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="latest__slider owl-carousel">
                            <div className="col-lg-4">
                                <div className="blog__item latest__item">
                                    <h4>What Makes Users Want to Share a Video on Social Media?</h4>
                                    <ul>
                                        <li>Jan 03, 2020</li>
                                        <li>05 Comment</li>
                                    </ul>
                                    <p>We recently launched a new website for a Vital client and wanted to share some of the
                                        cool features we were able...</p>
                                    <a href="#">Read more <span className="arrow_right"></span></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="blog__item latest__item">
                                    <h4>Bumper Ads: How to Tell a Story in 6 Seconds</h4>
                                    <ul>
                                        <li>Jan 03, 2020</li>
                                        <li>05 Comment</li>
                                    </ul>
                                    <p>We recently launched a new website for a Vital client and wanted to share some of the
                                        cool features we were able...</p>
                                    <a href="#">Read more <span className="arrow_right"></span></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="blog__item latest__item">
                                    <h4>What Makes Users Want to Share a Video on Social Media?</h4>
                                    <ul>
                                        <li>Jan 03, 2020</li>
                                        <li>05 Comment</li>
                                    </ul>
                                    <p>We recently launched a new website for a Vital client and wanted to share some of the
                                        cool features we were able...</p>
                                    <a href="#">Read more <span className="arrow_right"></span></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="blog__item latest__item">
                                    <h4>Bumper Ads: How to Tell a Story in 6 Seconds</h4>
                                    <ul>
                                        <li>Jan 03, 2020</li>
                                        <li>05 Comment</li>
                                    </ul>
                                    <p>We recently launched a new website for a Vital client and wanted to share some of the
                                        cool features we were able...</p>
                                    <a href="#">Read more <span className="arrow_right"></span></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="blog__item latest__item">
                                    <h4>What Makes Users Want to Share a Video on Social Media?</h4>
                                    <ul>
                                        <li>Jan 03, 2020</li>
                                        <li>05 Comment</li>
                                    </ul>
                                    <p>We recently launched a new website for a Vital client and wanted to share some of the
                                        cool features we were able...</p>
                                    <a href="#">Read more <span className="arrow_right"></span></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="blog__item latest__item">
                                    <h4>What Makes Users Want to Share a Video on Social Media?</h4>
                                    <ul>
                                        <li>Jan 03, 2020</li>
                                        <li>05 Comment</li>
                                    </ul>
                                    <p>We recently launched a new website for a Vital client and wanted to share some of the
                                        cool features we were able...</p>
                                    <a href="#">Read more <span className="arrow_right"></span></a>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="blog__item latest__item">
                                    <h4>What Makes Users Want to Share a Video on Social Media?</h4>
                                    <ul>
                                        <li>Jan 03, 2020</li>
                                        <li>05 Comment</li>
                                    </ul>
                                    <p>We recently launched a new website for a Vital client and wanted to share some of the
                                        cool features we were able...</p>
                                    <a href="#">Read more <span className="arrow_right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="footer">
                <div className="container">
                    <div className="footer__top">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="footer__top__logo">
                                    <a href="#"></a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="footer__top__social">
                                    <a href="#"><i className="fa fa-facebook" ></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-dribbble"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                    <a href="#"><i className="fa fa-youtube-play"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer__option">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="footer__option__item">
                                    <h5>Sobre Nosotros</h5>
                                    <p>Formada en 2024 por nosotros, es una galardonada empresa de servicio completo.</p>
                                    <a href="#" className="read__more">Leer más <span className="arrow_right"></span></a>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-3">
                                <div className="footer__option__item">
                                    <h5>Quienes somos</h5>
                                    <ul>
                                        <li><a href="#">Usuarios</a></li>
                                        <li><a href="#">Reservas</a></li>
                                        <li><a href="#">Contacto</a></li>
                                        <li><a href="#">Locacion</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-3">
                                <div className="footer__option__item">
                                    <h5>Nuestro trabajo</h5>
                                    <ul>
                                        <li><a href="#">Equipo</a></li>
                                        <li><a href="#">Grupo</a></li>
                                        <li><a href="#">Archive Web</a></li>
                                        <li><a href="#">Datos</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="footer__option__item">
                                    <h5>Boletin informativo</h5>
                                    <p>Empresa de producción de servicio completo especializada.</p>
                                    <form action="#">
                                        <input type="text" placeholder="Email" />
                                        <button type="submit"><i className="fa fa-send"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer__copyright">
                        <div className="row">
                            <div className="col-lg-12 text-center">

                                <p className="footer__copyright__text">Copyright &copy;
                                    <script>

                                    </script>
                                    Trabajo Final
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
