import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-center">Landing Page</h1>
            <div>
                <Link href='/sign-in'>
                <Button>
                    Sign In
                </Button>
                </Link>
                <Link href='/sign-up'>
                <Button>
                    Sign Up
                </Button>
                </Link>
            </div>
        </div>        
    );
}
export default LandingPage;