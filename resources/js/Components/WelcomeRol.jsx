import { Link, usePage } from '@inertiajs/react';

const WelcomeRol = () => {

   const { data } = usePage().props;

   console.log(data);

  return (
    <div>
     <Link href=''>BOCA</Link>
    </div>
  )
}

export default WelcomeRol
