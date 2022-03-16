import { Heading, MarketplaceItem } from '../../components';
import services from '../../data/services';

const Services = () => {
	return (
		<div className="wppw-services grid col2">
			<Heading level="3" className="screen-reader-text">
				{ __( 'Services', 'wp-plugin-web' ) }
			</Heading>
			{ services.map( ( item ) => (
				<MarketplaceItem key={ item.url } item={ item } />
			) ) }
		</div>
	);
};

export default Services;
