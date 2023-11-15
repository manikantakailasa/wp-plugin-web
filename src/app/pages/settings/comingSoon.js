import AppStore from '../../data/store';
import {
	webSettingsApiFetch,
	comingSoonAdminbarToggle,
} from '../../util/helpers';
import { useState } from '@wordpress/element';
import { useUpdateEffect } from 'react-use';
import { Alert, ToggleField } from "@newfold/ui-component-library";
import { SectionSettings } from "../../components/section";
import { useNotification } from '../../components/notifications/feed';

const ComingSoon = () => {
	const { store, setStore } = useContext(AppStore);
	const [comingSoon, setComingSoon] = useState(store.comingSoon);
	const [isError, setError] = useState(false);

	let notify = useNotification();

	const getComingSoonNoticeTitle = () => {
		return comingSoon
			? __('Coming soon activated', 'wp-plugin-web')
			: __('Coming soon deactivated', 'wp-plugin-web');
	};

	const getComingSoonNoticeText = () => {
		return comingSoon
			? __(
				'Coming soon page is active. Site requires login.',
				'wp-plugin-web'
			)
			: __(
				'Coming soon page is not active. Site is live to visitors.',
				'wp-plugin-web'
			);
	};
	
	const getComingSoonSectionTitle = () => {
		const getStatus = () => {
			return (
				comingSoon 
				? <span className="nfd-text-[#e10001]">{__('Coming Soon', 'wp-plugin-web')}</span>
				: <span className="nfd-text-[#008112]">{__('Live', 'wp-plugin-web')}</span>
			);
		};

		return (
			<span>{__('Site Status', 'wp-plugin-web')}: {getStatus()}</span>
		)
	};

	const toggleComingSoon = () => {
		webSettingsApiFetch({ comingSoon: !comingSoon }, setError, (response) => {
			setComingSoon(!comingSoon);
		});
	};

	const notifySuccess = () => {
		notify.push("coming-soon-toggle-notice", {
			title: getComingSoonNoticeTitle(),
			description: (
				<span>
					{getComingSoonNoticeText()}
				</span>
			),
			variant: "success",
			autoDismiss: 5000,
		});
	};

	useUpdateEffect(() => {
		setStore({
			...store,
			comingSoon,
		});

		notifySuccess();
		comingSoonAdminbarToggle(comingSoon);
	}, [comingSoon]);

	return (
		<SectionSettings
			title={getComingSoonSectionTitle()}
			description={__('Still building your site? Need to make a big change?', 'wp-plugin-web')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-6">
				<ToggleField
					id="coming-soon-toggle"
					label={__('Coming soon page', 'wp-plugin-web')}
					description={__(
						'Your Hostgator Coming Soon page lets you hide your site from visitors while you make the magic happen.',
						'wp-plugin-web'
					)}
					checked={comingSoon}
					onChange={() => {
						toggleComingSoon();
					}}
				/>

				{comingSoon &&
					<Alert variant="info">
						{__('Your website is currently displaying a "Coming Soon" page.', 'wp-plugin-web')}
					</Alert>
				}

				{isError &&
					<Alert variant="error">
						{__('Oops! Something went wrong. Please try again.', 'wp-plugin-web')}
					</Alert>
				}
			</div>
		</SectionSettings>
	);
}

export default ComingSoon;