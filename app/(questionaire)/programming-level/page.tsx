import { Contents } from '@/components/index';
import { programmingLevels } from '@/constants';

export default function ProgrammingLevel() {
	return (
		<section className=' h-full w-full'>
			<Contents
				path='/interest'
				position='right'
				bg='bg-white dark:bg-darkPrimary-3'
				cardBg='bg-white-800 dark:bg-darkPrimary-4 hover:bg-secondary-red-60 '
				contents={programmingLevels}
				title='Do you know how to code?'
			/>
		</section>
	);
}
